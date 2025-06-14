const refreshGet = (req, res) => {
  console.log(req.signedCookies.refreshToken);
  res.json({ accessToken: 'token' });
};

export default { refreshGet };
