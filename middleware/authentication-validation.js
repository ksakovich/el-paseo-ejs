function isAuthenticated(req, res, next)
{
    if (!req.session.isLoggedIn)
    {
        console.log("User is not logged In")
        return res.redirect('/login');
    }
    next();
}
function isAdmin(req, res, next)
{
    if (!req.user.is_admin)
    {
        console.log("User is not an Admin")
        res.redirect('/');
    }
    next();
}

module.exports = {
    isAuthenticated,
    isAdmin
}