const note = require('../models/note.js');
const create =(req,res)=>{
    //validate
    if(!req.body.content){
        return res.status(400).send({
            message:"note content cannot be empty"
        });
    }
    //create
    const note = new note({
        title:req.body.title || "untitled note",
        content : req.body.content 
    });
    //save
    note.save()
    .then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "some error ocured"
        });
    });

};   
const findall =(req,res)=>{
    note.find()
    .then(notes=>{
        res.send(notes);
    }).catch(err=>{
        res.status(500).send({
            message:err.message ||"some error occurred while retriving"
        });
    })
    

};
const findone =(req,res)=>{
    note.findById(req.params.noteId)
    .then(note=>{
        if(!note){
            return res.status(404).send({
                message:"note not found with id "+ req.params.noteId
            });
        }
        res.send(note);
    }).catch(err=>{
        if(err.kind==='ObjectId'){
            return res.status(404).send({
                message:"note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message:"error retriving note id "+ req.params.noteId
        });
    });

};
const update  =(req,res)=>{
    //validate req
    if(!req.body.content){
        return frames.status(400).send({
            message:"Note content can not be empty"
        });
    }

    //find note and updat it with the request body
    note.findByIdAndUpdate(req.params.noteId,{
        title:req.body.title || "untitled note",
        content:req.body.content
    },{new:true})
    .then(note=>{
        if(!note){
            return res.status(404).send({
                message:"note not found with id "+req.params.noteId
            });
        }
        res.send(note);
    }).catch(err=>{
        if (err.kind==='objectId'){
            return res.status(404).send({
                message:"note not found with id"+req.params.noteId
            });
        }
        return res.status(500).send({
            message:"error updating note with id"+req.params.noteId
        });
    });

};
const del =(req,res)=>{
    note.findByIdAndRemove(req.params.noteId)
        .then(note =>{
            if(!note){
                return res.status(404).send({
                    message:"note not found with id "+req.params.noteId
                });
            }
            res.send({message:"nite deleted sucessfully"});
        }).catch(err =>{
            if(err.kind === 'ObjectId' || err.name === 'NotFound'){
                return res.status(404).send({
                    message:"note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message:"could not delete note with id "+req.params.not
            });
        });
};

module.exports={
    create,
    findall,
    findone,
    update,
    del

}