const Note = require('../models/note.js');
// Create and Save a new Note
const create = (req, res) => {
    // Validate request
    
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note", 
        content: req.body.content
    });

    // Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};
  
const findall =(req,res)=>{
    Note.find()
    .then(notes=>{
        //render view with allm the posts
        res.send(notes);
    }).catch(err=>{
        res.status(500).send({
            message:err.message ||"some error occurred while retriving"
        });
    })
    

};
const findone =(req,res)=>{
    Note.findById(req.params.noteId)
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
    //render page 
    res.render('index');
    //validate req
    if(!req.body.content){
        return res.status(400).send({
            message:"Note content can not be empty"
        });
    }

    //find note and updat it with the request body
    Note.findByIdAndUpdate(req.params.noteId,{
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
    Note.findByIdAndRemove(req.params.noteId)
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