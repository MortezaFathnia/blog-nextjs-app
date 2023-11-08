'use client'
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { Post } from '../../types/Post';

import classes from './PostItem.module.css';
import useStore from '@/store'
import { deletePost } from '@/lib/api-requests'

interface IProps {
  post: Post;
}

const PostItem: FunctionComponent<IProps> = (props) => {
  const { title, content, id } = props.post;
  const store=useStore()
  const authUser=store.authUser;
  const formattedDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleDelete=(id:number)=>{
    deletePost(id);
  }

  return (
    <li className={classes.post}>
      <p onClick={()=>handleDelete(id)}>X</p>
      <h3>
        <Link href={`/posts/${id}`}>{title}</Link>
      </h3>
      <small className={classes.date}>
        {formattedDate} • ☕️ {Math.ceil(content.length / 10)} min read
      </small>
      <p>{content}</p>
    </li>
  );
};
export default PostItem;
