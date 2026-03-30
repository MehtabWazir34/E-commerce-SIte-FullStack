import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true, ref: 'Product'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true, ref: 'theUser'
    },
    comment:{
        type: String, required: true
    }
}, { timestamps: true});

export const OrderReviews = mongoose.model('OrderReview', reviewSchema);