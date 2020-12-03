import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./AddProduct.css";

import { db, imageRef } from "../../firebase";
import { UserContext } from "../../store/userContext/UserContext";

function AddProduct() {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const [userProducts, setUserProducts] = useState([]);
  const [productTitle, setProductTitle] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(null);
  const [productImages, setProductImages] = useState(null);

  // States below are used to manage the select lists
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState(0);

  if (!user) {
    history.push("/login");
  }

  //Set the categories for the select
  useEffect(() => {
    db.collection("product_categories_apple").onSnapshot((snapshot) =>
      setCategories(
        snapshot.docs.map((doc) => ({
          category_id: doc.data().category_id,
          label: doc.data().label,
        }))
      )
    );
  }, []);

  //Set the subcategories for the select according to the selected category
  useEffect(() => {
    if (selectedCategoryID) {
      db.collection("product_categories_apple")
        .doc(selectedCategoryID)
        .collection(selectedCategoryID + "_collection")
        .onSnapshot((snapshot) =>
          setSubCategories(
            snapshot.docs.map((doc) => ({
              category_id: doc.data().category_id,
              label: doc.data().label,
            }))
          )
        );
    }
  }, [selectedCategoryID]);

  const uploadToStorage = async () => {
    const file = document.querySelector(".image1").files[0];
    if (file) {
      const name = +new Date() + "-" + user?.uid + "-" + file.name;
      const metadata = {
        contentType: file.type,
      };
      const task = imageRef.child(name).put(file, metadata);
      task
        .then(async (snapshot) => await snapshot.ref.getDownloadURL())
        .then((url) => {
          setProductImages(url);
        })
        .catch(console.log("Error"));
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (user) {
      db.collection("products")
        .doc()
        .set({
          title: productTitle,
          category: productCategory,
          subCategory: productSubCategory,
          description: productDescription,
          price: productPrice,
          user_uid: user?.uid,
          isActive: true,
          images: {
            imageUrl_01: productImages,
            imageUrl_02: "this is the url image 01",
          },
        });
      history.push("/ManageProducts");
    }
  };

  const handleSelectCategory = (event) => {
    setProductCategory(event.target.value);
    const indexSelectedCategory = event.currentTarget.selectedIndex;
    setSelectedCategory(categories[indexSelectedCategory - 1].label);
    setSelectedCategoryID(categories[indexSelectedCategory - 1].category_id);
  };
  const handleSelectSubCategory = (event) => {
    setProductSubCategory(event.target.value);
    const indexSelectedSubCategory = event.currentTarget.selectedIndex;
    setSelectedSubCategory(subCategories[indexSelectedSubCategory - 1].label);
  };
  return (
    <div className="container">
      <h1>Ready to sell your product?</h1>
      <div className="addProduct">
        <div className="addProduct__title">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
          />
        </div>
        <div className="addProduct__Description">
          <label htmlFor="description">Description</label>
          <textarea
            rows="4"
            type="text"
            name="description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div className="addProduct__price">
          <label htmlFor="price">Price</label>

          <input
            type="number"
            name="price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder=""
          />
        </div>
        <div className="addProduct__category">
          <label htmlFor="category">Category</label>
          <select
            type="text"
            id="categorySelect"
            value={selectedCategory}
            onChange={handleSelectCategory}
          >
            <option value="0" selected disabled>
              Select the Category
            </option>
            {categories.map((category) => {
              return (
                <option key={category.category_id} value={category.label}>
                  {category.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="addProduct__subCategory">
          <label htmlFor="subcategory">Subcategory</label>
          <select
            type="text"
            name="subcategory"
            value={selectedSubCategory}
            onChange={handleSelectSubCategory}
          >
            <option value="0" selected disabled>
              Select the Subcategory
            </option>
            {subCategories.map((subcategory) => {
              return (
                <option key={subcategory.category_id} value={subcategory.label}>
                  {subcategory.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="addProduct__images">
          <h4>Add up to 5 images</h4>
          <input
            type="file"
            id="image1"
            className="image1"
            accept="image/png, image/jpeg"
            onChange={uploadToStorage}
          />
        </div>
        <button type="submit" onClick={addProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
