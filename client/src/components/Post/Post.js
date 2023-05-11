import React from 'react';
import {formatISO9075} from 'date-fns';

const Post = ({title,summary,cover,content,createdAt,author}) => {
  console.log(cover
    )
    return (
        <section class="text-gray-600 body-font">
  <div class="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center">
    <div class="lg:max-w-lg lg:w-96 md:w-1/2 w-5/6 mb-10 md:mb-0">
      <img class="object-cover object-center rounded" alt="hero" src={'http://localhost:5000/'+cover}/>
    </div>
    <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
        {/* Before they sold out
        <br class="hidden lg:inline-block"/>readymade gluten */}
        {title}
      </h1>
      <p className='text-2xl'>{author.username}</p>
      <time className='text-grey-500 text-lg'>{formatISO9075(new Date(createdAt))}</time>
      <p class="mb-8 leading-relaxed">{summary}</p>
      <div class="flex justify-center">
        <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
        <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
      </div>
    </div>
  </div>
</section>
    );
};

export default Post;