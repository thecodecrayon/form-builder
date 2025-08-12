import jwt from 'jsonwebtoken';

export const generateToken = async (user) => {
  const token = jwt.sign({ 
                  name: user.name, 
                  email: user.email, 
                  id: user._id 
                }, 
                process.env.JSON_TOKEN_KEY, 
              );

  return {  
    name: user.name,
    email: user.email,
    token
  }
}