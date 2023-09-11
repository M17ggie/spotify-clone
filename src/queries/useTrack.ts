import { gql } from "@apollo/client";

export const GET_TRACKS = gql`
query {
    songs{
            id
            name
            artist
            cover
            url
        }
    } 
`;