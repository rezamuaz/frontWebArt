import { GraphQLClient, request, gql, batchRequests } from "graphql-request";
import urlSlug from "url-slug";
import {
    ALL_POST_ID,
    ALL_POST_PAGINATE,
    METADATA_GET,
    POST_BY_ID,
    POST_CATEGORY,
    POST_NO_CONTENT,
    POST_SEARCH,
    POST_TAGS,
    USER_REQUEST_RESET,
    USER_RESET,
} from "./GraphqlSchema";

// Request Function SWR+GraphqlRequest

const URL = `${process.env.PROXY}`;

export const SWRfetcher = (query, variables) => request(URL, query, variables);

export async function QueryNoAuth(query, variables) {
    const endpoint = `${process.env.PROXY}`;
    const headers = { "Access-Control-Allow-Origin": "*" };
    const data = await request(endpoint, query, variables, headers);
    return data;
}
/**
 * @DESC to Request Batch Graphql
 * @Authorization NOT include
 * @Note pass query and variables in Array at QueryVariables
 * [
        { document: query1, variables: { id: 'C105' } },
        { document: query2 },
    ]
 */
export async function BatchQuery(QueryVariables) {
    const endpoint = `${process.env.PROXY}`;
    const data = await batchRequests(endpoint, QueryVariables);
    return data;
}

export async function GraphqlQueryAuth(query, variables) {
    const endpoint = `${process.env.PROXY}`;
    const client = new GraphQLClient(endpoint);
    const requestHeaders = {
        authorization: localStorage.getItem("token"),
    };
    const data = await client.request(query, variables, requestHeaders);
    return data;
}

export async function GraphqlMutation(mutation, variables) {
    const endpoint = `${process.env.PROXY}`;
    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    });

    const data = await graphQLClient.request(mutation, variables);
    return data;
}

// Short Request
export async function loadMetadata() {
    const variables = {
        getMetadataId: "627271cc9daacca09289920a",
    };
    const data = await QueryNoAuth(METADATA_GET, variables);
    return data;
}

export async function loadPathTerbaru(page, limit) {
    const variables = {
        page: Number(page),
        limit: limit,
        status: "PUBLISH",
    };
    const data = await QueryNoAuth(ALL_POST_PAGINATE, variables);
    return data;
}

export async function loadCategory(category, page) {
    const variables = {
        page: Number(page),
        limit: null,
        categoryName: category.toLowerCase(),
        categoryId: null,
    };
    const data = await QueryNoAuth(POST_CATEGORY, variables);
    return data;
}

export async function loadTags(tag, limit, page) {
    const variables = {
        page: Number(page),
        limit: limit,
        tags: urlSlug(tag).toLowerCase(),
    };
    const data = await QueryNoAuth(POST_TAGS, variables);
    return data;
}

export async function loadLatest(page, limit, status) {
    const variables = {
        page: Number(page),
        limit: Number(limit),
        status: status,
    };
    const data = await QueryNoAuth(POST_NO_CONTENT, variables);
    return data;
}

export async function loadBatchCategory(category) {
    const QueryVariables = category.map((e, i) => ({
        document: POST_CATEGORY,
        variables: {
            page: 1,
            limit: 3,
            categoryName: e.name,
            categoryId: null,
        },
    }));
    const data = await BatchQuery(QueryVariables);
    return data;
}

export async function loadAllPost() {
    const data = await QueryNoAuth(ALL_POST_ID);
    return data;
}

export async function loadSinglePost(title) {
    const variables = {
        getPostByIdOrNameId: null,
        title: title,
        slug: title,
    };
    const data = await QueryNoAuth(POST_BY_ID, variables);
    return data;
}

export async function loadSearch(q) {
    const variables = {
        search: q,
    };
    const data = await QueryNoAuth(POST_SEARCH, variables);
    return data;
}

export async function loadRequestReset(email) {
    const variables = {
        email: email,
    };
    const data = await QueryNoAuth(USER_REQUEST_RESET, variables);
    return data;
}
export async function loadUserReset(email, password, confpassword, token) {
    variables = {
        email: null,
        password: null,
        confirmPassword: null,
        resetToken: null,
    };
    const data = await QueryNoAuth(USER_RESET, variables);
    return data;
}
