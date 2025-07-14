import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { WithContext as ReactTags } from 'react-tag-input';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';

const separators = [',', 'Enter'];

const AddProduct = () => {
  const { user } = useAuth();
  const [tags, setTags] = useState([]);
  const [productPic, setProductPic] = useState('');
  const [imageTouched, setImageTouched] = useState(false);
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const handleImageUpload = async (e) => {
    setImageTouched(true);
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
      const res = await axios.post(imageUploadUrl, formData);
      setProductPic(res.data.data.url);
    } catch (err) {
      console.error('Image upload failed:', err);
    }
  };

  const handleDelete = (indexToRemove) => {
    const filteredTags = tags.filter((tag, index) => index !== indexToRemove);
    setTags(filteredTags);
  };

  const handleAddition = (newTag) => {
    const updatedTags = [...tags, newTag];
    setTags(updatedTags);
  };

  const onSubmit = async(data) => {
    if (!productPic) {
    setImageTouched(true);
    return;
    }

    const product = {
    productName: data.productName,
    description: data.description,
    externalLink: data.externalLink || '',
    ownerName: user.displayName,
    ownerEmail: user.email,
    ownerImage: user.photoURL,
    tags: tags.map(tag => tag.text),
    productImageUrl: productPic,
    createdAt: new Date().toISOString()
    };

    console.log(product);

    try {
      const res = await axiosInstance.post('/products', product);
      if (res.data.insertedId) {
        Swal.fire('Success!', 'Product added successfully.', 'success');
        reset();
        setTags([]);
        setProductPic('');
        setImageTouched(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: err.response?.data?.error || 'Something went wrong while adding the product.',
      });
    }

  };

  return (
    <div className='my-10'>
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset max-w-3xl mx-auto p-10 bg-base-200 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Add a Product</h2>

        <div className="form-control mb-4 w-full">
            <label className="label">Product Name<span className="text-red-500 ml-1">*</span></label>
            <input
            type="text"
            {...register('productName', { required: true })}
            placeholder="Enter product name"
            className="input input-bordered w-full"
            />
            {errors.productName && <p className="text-error text-sm mt-1">Product name is required</p>}
        </div>

        <div className="form-control mb-4 w-full">
            <label className="label">Product Image<span className="text-red-500 ml-1">*</span></label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full"
            />
            {!productPic && imageTouched && (
              <p className="text-error text-sm mt-1">Product image is required</p>
            )}
        </div>

        <div className="form-control mb-4 w-full">
            <label className="label">Description<span className="text-red-500 ml-1">*</span></label>
            <textarea
            {...register('description', { required: true })}
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Product description"
            />
            {errors.description && <p className="text-error text-sm mt-1">Description is required</p>}
        </div>

        <div className="form-control mb-4 w-full">
            <label className="label">Owner Name</label>
            <input
            type="text"
            value={user?.displayName || ''}
            readOnly
            className="input input-bordered w-full bg-base-200"
            />
        </div>

        <div className="form-control mb-4 w-full">
            <label className="label">Owner Email</label>
            <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="input input-bordered w-full bg-base-200"
            />
        </div>

        <div className="form-control mb-4 w-full">
            <label className="label">Owner Image URL</label>
            <input
            type="text"
            value={user?.photoURL || ''}
            readOnly
            className="input input-bordered w-full bg-base-200"
            />
        </div>

        <div className="form-control mb-6 w-full">
            <label className="label">Tags</label>
            <ReactTags
            tags={tags}
            separators={separators}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            inputFieldPosition="bottom"
            placeholder="Add tags and press Enter"
            classNames={{
                tags: 'flex flex-wrap gap-3 p-2 bg-base-100 border rounded-md',
                tagInput: 'w-full',
                tagInputField: 'input w-full h-8',
                tag: 'bg-primary text-white px-3 py-1 rounded-md',
                remove: 'ml-2 cursor-pointer text-sm'
            }}
            />
        </div>

        <div className="form-control mb-6 w-full">
            <label className="label">External Link (Optional)</label>
            <input
            type="url"
            {...register('externalLink')}
            placeholder="https://productsite.com"
            className="input input-bordered w-full"
            />
        </div>

        <div className="text-center">
            <button type="submit" className="btn btn-primary w-full">Submit Product</button>
        </div>
        </form>
    </div>
  );
};

export default AddProduct;