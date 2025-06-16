/**
 * Get new access token with a valid refresh token
 * @param {Request} req Express request
 * @param {Response} res Express response
 */
const refreshGet = (req, res) => {
  console.log(req.signedCookies.refreshToken);
  res.json({ accessToken: 'token' });
};

export default { refreshGet };
