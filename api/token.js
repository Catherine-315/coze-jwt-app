function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const appId = "1142848968657";
    const publicKeyId = "uYn4-N4dpDgELJYMPjlpHdy5oTZLkxMTBZrRdixYTjI";
    
    const rawPrivateKey = "-----BEGIN PRIVATE KEY-----\n" +
      "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDU6U8mRITB97U5\n" +
      "EPPs9zlwkcyXPSmr+E+fKNHkfk5wgNBUYeZtWk2YIge5+Bmcu4X7R9sGcmm7vshV\n" +
      "4tSYMCDQEIFqa1JBfFPxaR84IW9g081dLph3Ve2vomStkYV8c5yz6NXpDOUImCre\n" +
      "OoIIO0fQO1iV7lMQTQ0XymCegLvCFs+sSgX2sNsM4Gcgyv57jgaTiAQVbYBrPxVg\n" +
      "6cGS/o652tuB/I0rbk9nEd2fXmd7dpv2r7n9MVwS9qNsIJLDFDbKCyUC5FRp8PSt\n" +
      "I8KEpqbKqxTn4HhlqCYhaiYyA7KFVdk4UYS3HnHe7GOXcalDwg6nZ8rEjFsRP7BY\n" +
      "fLoX8o9lAgMBAAECggEAEVfh+SmKsOw3KGtfm1V2KdvOkSFL1DTZc4sVMeoyBIsR\n" +
      "rVX+Obkp6fMXswfpOjGyU8pCJq/KOh9r3Ucpby44dgpqKFuOq0Pv6JHaF63tjzMh\n" +
      "nu4NQGdRAcYWMmdQutcGFEeqqR3CSGVw1IJqljYR/v3elPQBcyn7n4z+OtscsE4a\n" +
      "Woc/0Cw6GxzjW0M9NeQJH1OE767XH5/q/DRAkelypHZSR2n1PNOB0CVjb0HwHnhI\n" +
      "fumAVtMY2932AjqZaH037W7p3e+X4k6LOKC/JcGmcvMNJqnM4niHRIv+2NHi64sQ\n" +
      "G4hBSAQNXoxOsmOa6giytBR1kQ9si/Vf+md/NBQjfwKBgQDpn3aB5DbOruLyQ77E\n" +
      "6/wU7xU0S7CH8SsZfkv4sAxnvH+kSTZLN/USybGzQbeo4oqJkgpyCRMNw3BBjGT0\n" +
      "WgV6s23V5C5jRV0zRKuObbIoHoTeiSwyOgHWJRLQX4g5z2AIcl3X49qtfirFLyfe\n" +
      "6JZNFoVZwvED+EJ4FEDbsJOIKwKBgQDpTf17nLNvcmUDfnqRNrNLg5HNEae8iV+N\n" +
      "rp+R4DxVdgJYolUzKvGwfLWprOy29AO9Ew2FIG42MRVED80XXnQpFFglSaevNifV\n" +
      "ryeUknH0ld/0o6np8V3Fcb4nGa6gXypE++4fFed2R+JJkXEfLeW7iNIO6pbsYfRH\n" +
      "jOJ6asJurwKBgE7bFVwolNtUqqPNfBHp+Y9zV7vsJGzuWXbka25Ithc5x/fDAoGH\n" +
      "JMCvtbxk3UIzHUHsOnxdVcIaisSFR/o2fIz7DYLZ31KAskHA1wtfOXhTPNQEhxd4\n" +
      "/u+yWdRdupSQy8BuIgDiFwjigjtGfHXAGiNxC5fNth556K2xYGcHBfU7AoGAPn5w\n" +
      "nvL7saev3T688Db50gl9PbQz/THDEb2r6rRpFO9Wc42QSvN+6CqPstKqWduFQNlg\n" +
      "rr9gJk4Bh0jARDk93l8fuWVAcJOOGhQgAxEzSzP2WJ6afhr0ZlYwfGLJvxWeyfm9\n" +
      "8D+6z5kzyUcXSSXPOuvMcMhwAwO+Hohjhi0gxesCgYEA0ONKcqYa82eOWHOQ6CZg\n" +
      "gFMkM0e9SHUA3YPooFLSQ3OO+cPHJBTjaqDNroeHLtMq+rLK4If0k9qmjDrpjzUi\n" +
      "894YBpj/1BXYp+idy9mHx71vzoM/5kUSWpoox6Fxggk8ImF3M9/t0crOTrrwb0Js\n" +
      "GGOuO3zY3Yts4aLTiJKelmg=\n" +
      "-----END PRIVATE KEY-----";

    const userId = req.query.user_id || 'guest_' + Math.random().toString(36).substring(2, 15);

    const header = {
      alg: 'RS256',
      typ: 'JWT',
      kid: publicKeyId
    };

    const currentTime = Math.floor(Date.now() / 1000);
    const payload = {
      iss: appId,
      sub: appId,
      aud: 'api.coze.com',
      iat: currentTime,
      exp: currentTime + 3600,
      jti: Math.random().toString(36).substring(2)
    };

    const unsignedToken = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}`;

    const { createPrivateKey, createSign } = require('crypto');
    const privateKeyObj = createPrivateKey(rawPrivateKey);

    const sign = createSign('RSA-SHA256');
    sign.update(unsignedToken);
    sign.end();
    
    const signature = sign.sign(privateKeyObj, 'base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    const jwtToken = `${unsignedToken}.${signature}`;

    const tokenResponse = await fetch('https://api.coze.com/api/permission/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      },
      body: JSON.stringify({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        duration_seconds: 86399
      })
    });

    const data = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return res.status(200).json({ step: "COZE_API_FAIL", error: data });
    }

    return res.status(200).json({
      access_token: data.access_token,
      user_id: userId
    });

  } catch (error) {
    return res.status(200).json({ step: "CODE_CRASH", message: error.message, stack: error.stack });
  }
};