exports.get404 = (req, res, next) =>
{
  res.status(404).render('404', {
    pageTitle: 'Page Not Found',
    path: '/404',
    isAuthenticated: req.session.isLoggedIn,
    username: req.user?.user_name ?? 'Guest',
    isAdmin: req.user?.is_admin ?? false
  });
};
