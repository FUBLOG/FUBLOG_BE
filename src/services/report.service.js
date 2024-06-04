const express = require("express");
const reportModel = require("../model/report.model");
const { ConflictRequestError, NotFoundError, BadRequestError } = require("../core/response/error.response");
const { isUserIDExist } = require("../repository/user.repo");
const Validator = require("../core/validator")

class reportService{

    newReport = async(data)=>{
        if (
            Validator.isEmpty(data.reason) ||
            Validator.isEmpty(data.userId) ||
            Validator.isEmpty(data.linkToPost)
          )
                throw new BadRequestError("Please no empty content")
            // if(!(await isUserIDExist(data.userId)))
            //     throw new NotFoundError("Id Not Found")
            const create =  await reportModel.create(data);
            return create;
        } ;
    viewReport = async (id)=>{
        const view = await reportModel.findById(id);
        if(!view)
            throw new NotFoundError("ID Not Found");
        return view;
    }
    viewAllReport = async()=>{
        const view = await reportModel.find()
        if(!view)
            throw new NotFoundError("Reports list is empty");
        return view
    };
    updateReport = async({id},content)=>{
        if(!(await this.viewReport(id)))
             throw new NotFoundError("Cannot Find ID");
        return await reportModel.findByIdAndUpdate(id, content)
    };
    deleteReport = async({id})=>{
        if(await this.viewReport(id).length === 0)
            throw new NotFoundError("Cannot Find ID");
        return await reportModel.findByIdAndDelete(id)
    }

    }
module.exports = new reportService();