
const home =(req,res)=>{
    res.render('index', { title: 'Notes',
    message:'welcome to notes'
});
    
};

module.exports={
    home

}