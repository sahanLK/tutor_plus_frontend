'use client';

import {useSearchParams} from "next/navigation";

export default function Token() {
    const searchParams = useSearchParams();
    console.log(searchParams);
    console.log("Access Token: ", searchParams.get("access_token"));
    // const searchParams = request.nextUrl.searchParams;
    // const query = searchParams.get('query');
    // console.log(searchParams);
    // console.log(query);
    // query is "hello" for /api/search?query=hello
}