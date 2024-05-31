const express = require("express");
const reportModel = require("../model/report.model");
const { ConflictRequestError, NotFoundError, BadRequestError } = require("../core/response/error.response");
const { isUserIDExist } = require("../repository/user.repo");
const Validator = require("../core/validator")

class reportService{

    newReport = async(data)=>{
            if(Validator.isEmpty(data.reason||data.userId||data.linkToPost))
                throw new BadRequestError()
            if(!(await isUserIDExist(data.userId)))
                throw new NotFoundError("Id Not Found")
            const create =  await reportModel.create(data);
            return create;
        } ;
    viewReport = async (id)=>{
        const view = await reportModel.findById(id);
        if(!view)
            throw new NotFoundError();
        return view;
    }
    viewAllReport = async()=>{
        const view = await reportModel.find()
        if(!view)
            throw new NotFoundError();
        return view
    };
    updateReport = async(id,content)=>{
        if(!(await this.viewReport(id)))
             throw new NotFoundError("Cannot Find ID");
        return await reportModel.findByIdAndUpdate(id, content)
    };
    deleteReport = async(id)=>{
        if(await this.viewReport(id).length === 0)
            throw new NotFoundError("Cannot Find ID");
        return await reportModel.findByIdAndDelete(id)
    }

    }
module.exports = new reportService();