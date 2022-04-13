import { NextApiRequest, NextApiResponse } from "next";
import auth0 from "../../lib/auth0";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await auth0.handleProfile(req, res);
    } catch (error) {
        console.error(error);
        // @ts-ignore
        res.status(error.status || 500).end(error.message);
    }
}