import { createContext, useReducer } from "react";


const DEFAULT_POST__LIST=[{
    id:"1",
    title:'Going to Mumbai',
    body:"Hi Friends, I am going to Mumbhai for my vacations",
    reactions:10,
    userId:"user-9",
    tags:['travel','vacation','mumbai']
},
{
    id:"2",
    title:'Going to Delhi',
    body:"Hi Friends, I passed my exam",
    reactions:15,
    userId:"user-8",
    tags:['Graduation','vacation','Delhi']
}



]

export const PostList=createContext({
    postList:[],
    addPost:()=>{},
    deletePost:()=>{}
})

const postListReducer=(currPostList,action)=>{
    let newPostList=currPostList;
    if(action.type==="ADD_POST"){
        newPostList=[action.payload,...currPostList];

    }else if(action.type==="DELETE_POST"){
        newPostList=currPostList.filter((post) => post.id !== action.payload.postId);


    }
    return newPostList;
}

const PostListProvider=({children})=>{
    const [postList,dispatchPostList]=useReducer(postListReducer,DEFAULT_POST__LIST)

    const addPost=(userId,postTitle,postBody,reactions,tags)=>{
        dispatchPostList({
            type:'ADD_POST',
            payload:{
                id:Math.floor(Math.random() * 100),
                title:postTitle,
                body:postBody,
                reactions:reactions,
                userId:userId,
                tags:tags
                },
            }

        )

        console.log(`${userId} ${postTitle} ${postBody} ${reactions} ${tags}`)

    }
    const deletePost=(postId)=>{
        console.log(postId)
        dispatchPostList({
            type:'DELETE_POST',
            payload:{
             postId
             },
    });
        

    };
    return <PostList.Provider value={{postList,addPost,deletePost}}>
        {children}
    </PostList.Provider>

};



export default PostListProvider;