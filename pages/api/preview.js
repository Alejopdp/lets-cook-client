export default function setPreviusData(req, res){
    const { token } = req.query;
    if( !!!token ) res.status(401).json({ result: "failed" });
    // TODO: Validate Token from API.
    res.setPreviewData({ token });
    res.status(200).json({ result: "success" });
};
