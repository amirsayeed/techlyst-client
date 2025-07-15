import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import ReactTags from '@pathofdev/react-tag-input';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import '@pathofdev/react-tag-input/build/index.css';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const UpdateProduct = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [tags, setTags] = useState([]);
  const [productPic, setProductPic] = useState('');
  const [imageTouched, setImageTouched] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    axiosSecure.get(`/products/${id}`)
      .then(res => {
        const p = res.data;
        setValue('productName', p.productName);
        setValue('description', p.description);
        setValue('externalLink', p.externalLink || '');
        setProductPic(p.productImageUrl);
        setTags(p.tags || []);
      })
      .catch(() => Swal.fire('Error', 'Failed to fetch product data', 'error'));
  }, [id, axiosSecure, setValue]);

  const handleImageUpload = async (e) => {
    setImageTouched(true);
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`, formData);
      setProductPic(res.data.data.url);
    } catch {
      Swal.fire('Error', 'Image upload failed', 'error');
    }
  };

  const onSubmit = async (data) => {
    if (!productPic) {
      setImageTouched(true);
      return;
    }

    const updatedProduct = {
      productName: data.productName,
      description: data.description,
      externalLink: data.externalLink || '',
      tags,
      productImageUrl: productPic,
    };

    try {
      const res = await axiosSecure.patch(`/products/${id}`, updatedProduct);
      if (res?.data.modifiedCount) {
        Swal.fire('Success!', 'Product updated successfully.', 'success');
        navigate('/dashboard/myProducts');
      }
    } catch {
      Swal.fire('Error', 'Failed to update product.', 'error');
    }
  };

  return (
    <div className="my-10">
      <form onSubmit={handleSubmit(onSubmit)} className="fieldset max-w-3xl mx-auto p-10 bg-base-200 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Update Product</h2>

        <div className="form-control mb-4 w-full">
          <label className="label">
            Product Name<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            {...register('productName', { required: true })}
            placeholder="Enter product name"
            className="input input-bordered w-full"
          />
          {errors.productName && (
            <p className="text-error text-sm mt-1">Product name is required</p>
          )}
        </div>

        <div className="form-control mb-4 w-full">
          <label className="label">
            Product Image<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />
          {!productPic && imageTouched && (
            <p className="text-error text-sm mt-1">Product image is required</p>
          )}
          {productPic && (
            <img
              src={productPic}
              alt="Product Preview"
              className="mt-2 h-28 object-contain"
            />
          )}
        </div>

        <div className="form-control mb-4 w-full">
          <label className="label">
            Description<span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            {...register('description', { required: true })}
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Product description"
          />
          {errors.description && (
            <p className="text-error text-sm mt-1">Description is required</p>
          )}
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
            onChange={setTags}
            placeholder="Add tags and press Enter"
            classNames={{
              tags: 'flex flex-wrap gap-3 p-2 bg-base-100 border rounded-md',
              tag: 'bg-primary text-white px-3 py-1 rounded-md',
              tagInput: 'w-full',
              tagInputField: 'input w-full h-10',
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
          <button type="submit" className="btn btn-primary w-full">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
