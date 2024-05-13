
import Markdown from "markdown-to-jsx"
import getPostMetaData from "@/utils/getPostMetaData"
import React from "react"
import fs from 'fs'
import matter from "gray-matter"


function getPostContent(slug) {
    const folder = 'recipes/';
    const file = folder + `${slug}.md`;
    const content = fs.readFileSync(file, 'utf8');

    const matterResult = matter(content);
    return matterResult;
}

export const generateStaticParams = async () => {
    const posts = getPostMetaData('recipes');
    return posts.map((post) => ({
        slug: post.slug
    }))
}

export async function generateMetaData({params, searchParams}){
    const id = params?.slug ? ' . ' + params?.slug : ' ';
    return {
        title: `The Bubble Baker ${id.replace('_', ' ')}`,
    }
}

export default function RecipePage(props){

    const slug = props.params.slug;
    const post = getPostContent(slug);
    console.log(post);
    return (
        <main>
            <Markdown>
                {post.content}
            </Markdown>
        </main>
    )
}