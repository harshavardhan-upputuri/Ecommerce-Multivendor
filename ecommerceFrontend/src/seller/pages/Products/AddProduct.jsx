import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Alert, Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { UploadToCloudinary } from '../../../Util/UploadToCloudinary';
import CloseIcon from '@mui/icons-material/Close';
import colors from '../../../data/Filter/color'
import { menLevelThree } from '../../../data/category/level Three/menLevelThree';
import { womenLevelThree } from '../../../data/category/level Three/womenLevelThree';
import { furnitureLevelThree } from '../../../data/category/level Three/furnitureLevelThree';
import { electronicsLevelThree } from '../../../data/category/level Three/electronicsLevelThree';
import { electronicsLevelTwo } from '../../../data/category/level two/electronicsLevelTwo';
import { furnitureLevelTwo } from '../../../data/category/level two/furnitureLevelTwo';
import { womenLevelTwo } from '../../../data/category/level two/womenLevelTwo';
import { menLevelTwo } from '../../../data/category/level two/menLevelTwo';
import { mainCategory } from '../../../data/category/mainCategory';
import { useAppDispatch } from '../../../State/Store';
import { createProduct } from '../../../State/seller/sellerProductSlice';
const categoryThree = {
  men: menLevelThree,
  women: womenLevelThree,
  kids: [],
  home_furniture: furnitureLevelThree,
  beauty: [],
  electronics: electronicsLevelThree,
};

const categoryTwo = {
  men: menLevelTwo,
  women: womenLevelTwo,
  kids: [],
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicsLevelTwo,
};

const sizes = [
  { name: "XS" },
  { name: "S" },
  { name: "M" },
  { name: "L" },
  { name: "XL" },
  { name: "XXL" },
  { name: "XXXL" }
];


const AddProduct = () => {
  const [uploadImage, setUploadingImage] = useState(false);
  const [snackbarOpen, setOpenSnackbar] = useState(false);
  
  const dispatch=useAppDispatch()
  
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      color: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
      sizes: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(createProduct({request:values,jwt:localStorage.getItem("jwt")}))
    }
  });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setUploadingImage(true);
    const image = await UploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image])
    setUploadingImage(false);

  }
  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const childCategory = (category, parentCategoryId) => {
    return category.filter((child) => {
      return child.parentCategoryId == parentCategoryId;
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className='space-y-4 p-4'>
        <Grid container spacing={2}>
          <Grid className="flex flex-wrap gap-5" size={{ xs: 12 }}>
            <input type='file' accept="image/*" id="fileInput" style={{ display: "none" }} onChange={handleImageChange} />

            <label className='relative' htmlFor="fileInput">
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                <AddPhotoAlternateIcon className="text-gray-700" />
              </span>
              {uploadImage && (
                <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                  <CircularProgress />
                </div>
              )}
            </label>
            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={`ProdutImage ${index + 1}`} className="w-24 h-24 object-cover" />

                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    className=''
                    size='small'
                    color='error'
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      outline: "none",
                    }}
                  >
                    <CloseIcon sx={{ fontsize: "1rem" }} />
                  </IconButton>

                </div>
              ))}
            </div>

          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id='title'
              name='title'
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              multiline
              rows={4}
              fullWidth
              id='description'
              name='description'
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <TextField
              fullWidth
              id='mrp_price'
              name='mrpPrice'
              label="MRP Price"
              type='number'
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
              helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <TextField
              fullWidth
              id='sellingPrice'
              name='sellingPrice'
              label="Selling Price"
              type='number'
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
              helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <FormControl fullWidth error={formik.touched.color && Boolean(formik.errors.color)} required>
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                id="color"
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                label="Color"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {colors.map((color, index) => <MenuItem value={color.name}>
                  <div className="flex gap-3">
                    <span style={{ backgroundColor: color.hex }} className={`h-5 w-5 rounded-full ${color.name === "White" ? "border" : ""}`}></span>
                    <p>{color.name}</p>
                  </div>
                </MenuItem>)}
              </Select>
              {formik.touched.color && formik.errors.color && (
                <FormHelperText>{formik.errors.color}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <FormControl fullWidth error={formik.touched.sizes && Boolean(formik.errors.sizes)} required>
              <InputLabel id="sizes-label">Sizes</InputLabel>
              <Select
                labelId="sizes-label"
                id="sizes"
                name="sizes"
                value={formik.values.sizes}
                onChange={formik.handleChange}
                label="Sizes"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {sizes.map((sizes, index) => <MenuItem value={sizes.name}>
                  <div className="flex gap-3">
                    <span className={`h-5 w-5 rounded-full ${sizes.name === "White" ? "border" : ""}`}></span>
                    <p>{sizes.name}</p>
                  </div>
                </MenuItem>)}
              </Select>
              {formik.touched.sizes && formik.errors.sizes && (
                <FormHelperText>{formik.errors.sizes}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl fullWidth error={formik.touched.category && Boolean(formik.errors.category)} required>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                label="category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {mainCategory.map((category, index) => <MenuItem value={category.categoryId}>
                  <div className="flex gap-3">

                    <p>{category.name}</p>
                  </div>
                </MenuItem>)}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl fullWidth error={formik.touched.category2 && Boolean(formik.errors.category2)} required>
              <InputLabel id="category2-label">Category2</InputLabel>
              <Select
                labelId="category2-label"
                id="category2"
                name="category2"
                value={formik.values.category2}
                onChange={formik.handleChange}
                label="category2"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {(categoryTwo[formik.values.category] || []).map((category2, index) => <MenuItem value={category2.categoryId}>
                  <div className="flex gap-3">
                    <p>{category2.name}</p>
                  </div>
                </MenuItem>)}
              </Select>
              {formik.touched.category2 && formik.errors.category2 && (
                <FormHelperText>{formik.errors.category2}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl fullWidth error={formik.touched.category3 && Boolean(formik.errors.category3)} required>
              <InputLabel id="category3-label">Category3</InputLabel>
              <Select
                labelId="category3-label"
                id="category3"
                name="category3"
                value={formik.values.category3}
                onChange={formik.handleChange}
                label="category3"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {childCategory(categoryThree[formik.values.category] || [], formik.values.category2).map((category3, index) => <MenuItem value={category3.categoryId}>
                  <div className="flex gap-3">
                    <p>{category3.name}</p>
                  </div>
                </MenuItem>)}
              </Select>
              {formik.touched.category3 && formik.errors.category3 && (
                <FormHelperText>{formik.errors.category3}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12}}>
            <Button
              sx={{ p: "14px" }}
              color='primary'
              variant='contained'
              fullWidth
              type='submit'
            //disabled={sellerProduct.loading}
            >
              {false ? <CircularProgress size="samll" sx={{ width: "27px", height: "27px" }} /> : "Add Product"}
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={sellerProduct.error ? "error" : "success"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {sellerProduct.error ? sellerProduct.error : "Product created successfully"}
        </Alert>
      </Snackbar> */}


    </div>
  )
}

export default AddProduct
