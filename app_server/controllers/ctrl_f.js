const post =(req,res)=>{
    res.render('submit');
};
const view =(req,res)=>{
    res.render('view');
}
module.exports={
    post,
    view
}