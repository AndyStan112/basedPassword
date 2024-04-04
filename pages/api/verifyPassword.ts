import { withIronSession } from 'next-iron-session';

const randomStrings = ['cG9saWN0Znt0', 'aGlzIGlzIHR', 'oZSBtb3N0IGJhc2','VkIGJh','c2VkIHB','hc3N3b3Jk','IG9mIGFsbCB0aW1lcywgY','mVhd','GluZyBhbGwgdW','5iYXNlZCBwYXNzd29yZHN9'];

async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    let session = req.session.get('session');

    if (!session) {
      session = { failedAttempts: 0 };
    }
    console.log(session.failedAttempts)
    const { password } = req.body;
    
    if (password === 'cG9saWN0Znt0aGlzIGlzIHRoZSBtb3N0IGJhc2VkIGJhc2VkIHBhc3N3b3JkIG9mIGFsbCB0aW1lcywgYmVhdGluZyBhbGwgdW5iYXNlZCBwYXNzd29yZHN9') {
      session.failedAttempts = 0; 
      req.session.set('session', session); 
      await req.session.save();
      return res.status(200).json({ message: 'That is indeed the flag, you just have to decode it now' });
    } else {
      session.failedAttempts++;
      req.session.set('session', session); 
      await req.session.save();

      if (session.failedAttempts === 1) {
        const randomString = randomStrings[Math.floor(Math.random() * randomStrings.length)];
        return res.status(200).json({ message: 'Incorrect password. Here is a hint:'+randomString });
      } else {
        return res.status(200).json({ message: 'Incorrect password. Too many failed attempts' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withIronSession(handler, {
  password: 'your_password_for_session_encryption',
  cookieName: 'session',
  cookieOptions: {
    secure: false,
  },
  
});
