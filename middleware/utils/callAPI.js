const makeAPICall = async(method, url, body) => {
    const settings = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'Lance-35hkk3h5h545l3jlkhkhjkl3454h3lkh335gk3g5g3k5hkhbkdkdifdifkjlsf',
        },
        body: JSON.stringify(body)
    };

    try {
        const fetchResponse = await fetch(url, settings);
        const resData = await fetchResponse.json();
        return resData;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    makeAPICall:makeAPICall
}