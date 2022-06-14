/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import AuthContext from "../components/context/AuthContext";


export const useToken = () => {
    const { accessToken } = useContext(AuthContext)!;
    return accessToken;
}