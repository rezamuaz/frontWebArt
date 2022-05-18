import { gql, batchRequests } from "graphql-request";
// General function request
/**
 * @DESC to QUERY
 * @Authorization NOT include
 */
// POST Management
// POST QUERY
export const POST_NO_CONTENT = gql`
    query GetPostsWithPagination($page: Int, $limit: Int, $status: PostStatus) {
        getPostsWithPagination(page: $page, limit: $limit, status: $status) {
            posts {
                _id
                title
                slug
                author {
                    firstName
                    lastName
                }
                image {
                    url
                    title
                    caption
                }
                category {
                    name
                }
                status
                description
                releaseAt
            }
            paginator {
                perPage
                totalPosts
                totalPages
                currentPage
                hasPrevPage
                hasNextPage
            }
        }
    }
`;

export const ALL_POST_ID = gql`
    query Query {
        allPost {
            _id
            slug
        }
    }
`;

export const ALL_POST_PAGINATE = gql`
    query GetPostsWithPagination($page: Int, $limit: Int, $status: PostStatus) {
        getPostsWithPagination(page: $page, limit: $limit, status: $status) {
            posts {
                _id
                title
                slug
                author {
                    firstName
                    lastName
                }
                image {
                    url
                    title
                    caption
                }
                category {
                    name
                }
                tags {
                    label
                    value
                }
                content
                description
                releaseAt
            }
            paginator {
                prev
                next
                perPage
                totalPosts
                totalPages
                currentPage
                hasPrevPage
                hasNextPage
            }
        }
    }
`;

export const POST_CATEGORY = gql`
    query Query(
        $page: Int
        $limit: Int
        $categoryName: String
        $categoryId: ID
    ) {
        getPostByCategory(
            page: $page
            limit: $limit
            category_name: $categoryName
            category_id: $categoryId
        ) {
            posts {
                _id
                title
                category {
                    name
                }
                author {
                    firstName
                    lastName
                }
                image {
                    url
                    title
                }
                slug
                description
                releaseAt
            }
            paginator {
                perPage
                totalPosts
                totalPages
                currentPage
            }
        }
    }
`;

export const POST_TAGS = gql`
    query GetPostByTags($page: Int, $limit: Int, $tags: String) {
        getPostByTags(page: $page, limit: $limit, tags: $tags) {
            posts {
                author {
                    firstName
                    lastName
                }
                title
                slug
                image {
                    url
                    title
                    caption
                }
                category {
                    name
                }
                tags {
                    label
                    value
                }
                content
                description
                releaseAt
                _id
            }
            paginator {
                perPage
                totalPosts
                totalPages
                currentPage
            }
        }
    }
`;

export const POST_BY_ID = gql`
    query GetPostById($title: String, $slug: String, $getPostByIdOrNameId: ID) {
        getPostByIdOrName(
            title: $title
            slug: $slug
            id: $getPostByIdOrNameId
        ) {
            _id
            title
            slug
            author {
                firstName
                lastName
            }
            image {
                url
                title
                caption
            }
            category {
                name
            }
            tags {
                label
                value
            }
            status
            content
            description
            releaseAt
        }
    }
`;

export const POST_PAGINATE = gql`
    query GetPostsWithPagination($page: Int, $limit: Int, $status: PostStatus) {
        getPostsWithPagination(page: $page, limit: $limit, status: $status) {
            paginator {
                prev
                next
                perPage
                totalPosts
                totalPages
                currentPage
                hasPrevPage
                hasNextPage
            }
        }
    }
`;

export const POST_SEARCH = gql`
    query SearchPosts($search: String) {
        searchPosts(search: $search) {
            posts {
                _id
                title
                slug
                category {
                    name
                }
                image {
                    url
                    title
                }
                releaseAt
            }
            paginator {
                perPage
                totalPosts
                totalPages
                currentPage
            }
        }
    }
`;

// POST MUTATION
export const POST_CREATE = gql`
    mutation Mutation($newPost: PostInput) {
        createPost(newPost: $newPost) {
            _id
            author {
                firstName
                lastName
            }
            title
            image {
                url
                title
                caption
            }
            category {
                _id
                name
            }
            tags {
                label
            }
            content
            show
            description
            createdAt
            updatedAt
        }
    }
`;

export const POST_DELETE = gql`
    mutation DeletePost($deletePostId: ID) {
        deletePost(id: $deletePostId) {
            message
            success
        }
    }
`;

export const POST_UPDATE = gql`
    mutation Mutation($update: PostInput, $updatePostId: ID) {
        updatePost(update: $update, id: $updatePostId) {
            _id
            author {
                firstName
                lastName
            }
            title
            slug
            image {
                url
                title
                caption
            }
            category {
                _id
                name
            }
            tags {
                label
                value
            }
            content
            status
            show
            description
            releaseAt
            createdAt
            updatedAt
        }
    }
`;
// =================================================================
// METADATA Management

export const METADATA_GET = gql`
    query Query($getMetadataId: String) {
        getMetadata(id: $getMetadataId) {
            _id
            menu {
                name
                slug
            }
        }
    }
`;

export const META_MENU_UPDATE = gql`
    mutation Mutation($updateMenuId: String, $updateMenu: [MenuItems]) {
        updateMenu(id: $updateMenuId, updateMenu: $updateMenu) {
            message
            success
        }
    }
`;
// ==================================================================
// ADMIN
// Authentication
/**
 * @DESC to QUERY, MUTATION
 * @ACCESS GET TOKEN, REGISTER, LOGIN
 */
// USER Management
export const USER_GET_AUTH = gql`
    query AuthUser {
        authUser {
            _id
            username
            firstName
            lastName
            email
            role
            image
        }
    }
`;

export const USER_TOKEN = gql`
    query Query($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
                firstName
                lastName
                role
                image
            }
        }
    }
`;

export const USER_REGISTER = gql`
    mutation Mutation($newUser: UserInput!) {
        registerUser(newUser: $newUser) {
            token
            user {
                _id
                email
                firstName
                lastName
                role
            }
        }
    }
`;

export const USER_UPDATE_NAME = gql`
    mutation Mutation($userId: ID, $firstName: String, $lastName: String) {
        changeUserData(
            user_id: $userId
            firstName: $firstName
            lastName: $lastName
        ) {
            _id
            email
            username
            firstName
            lastName
            role
            image
        }
    }
`;

export const USER_UPDATE_EMAIl = gql`
    mutation ChangeUserEmail($userId: ID, $email: String) {
        changeUserEmail(user_id: $userId, email: $email) {
            _id
            email
            username
            firstName
            lastName
            role
            image
        }
    }
`;
export const USER_BY_ID = gql`
    query GetUserById($userId: ID) {
        getUserById(user_id: $userId) {
            _id
            email
            username
            firstName
            lastName
            role
            image
        }
    }
`;
export const USER_GET_ALL = gql`
    query GetAllUser {
        getAllUser {
            _id
            email
            username
            firstName
            lastName
            role
            image
            createdAt
            updatedAt
        }
    }
`;
export const USER_SET_ROLE = gql`
    mutation Mutation($userId: ID, $setRole: UserRoles) {
        setUserRoleById(user_id: $userId, setRole: $setRole) {
            _id
            email
            username
            firstName
            lastName
            role
        }
    }
`;

export const USER_REQUEST_RESET = gql`
    mutation Mutation($email: String) {
        requestReset(email: $email) {
            message
            success
        }
    }
`;

export const USER_RESET = gql`
    mutation ResetPassword(
        $email: String
        $password: String
        $confirmPassword: String
        $resetToken: String
    ) {
        resetPassword(
            email: $email
            password: $password
            confirmPassword: $confirmPassword
            resetToken: $resetToken
        ) {
            token
            user {
                _id
            }
        }
    }
`;

export const USER_DELETE = gql`
    mutation Mutation($userId: ID) {
        deleteUserById(user_id: $userId) {
            message
            success
        }
    }
`;

export const USER_IMAGE = gql`
    mutation SetImage($userId: ID, $imageUrl: String) {
        setImage(user_id: $userId, imageUrl: $imageUrl) {
            _id
        }
    }
`;
// ==============================================================================
// Admin Manage Category
/**
 * @DESC to QUERY, MUTATION
 * @ACCESS ADD, GET, DELETE
 */
// CATEGORY Management
// CATEGORY QUERY
export const All_CATEGORY = gql`
    query Query {
        allCategory {
            _id
            name
        }
    }
`;
// CATEGORY MUTATION
export const ADD_CATEGORY = gql`
    mutation Mutation($newCategory: CategoryCreate) {
        createCategory(newCategory: $newCategory) {
            name
        }
    }
`;

export const DELETE_CATEGORY = gql`
    mutation DeleteCategory($deleteCategoryId: ID) {
        deleteCategory(id: $deleteCategoryId) {
            message
            success
        }
    }
`;
