import jwt from 'jsonwebtoken';

export async function authMiddleware(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    throw Object.assign(new Error('Invalid or missing Token'), { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;

  next();
}

export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.status ? err.message : 'Internal server error';
  return res.status(status).json({ message });
}
