'use client'
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { Post } from '../../types/Post';

import classes from './PostItem.module.css';
import useStore from '@/store'
import { deletePost, getAllPosts } from '@/lib/api-requests'
import { IoIosCloseCircleOutline, IoMdCreate } from "react-icons/io"

interface IProps {
  post: Post;
}

const PostItem: FunctionComponent<IProps> = (props) => {
  const { title, content, id } = props.post;
  const store = useStore()
  const authUser = store.authUser;
  const formattedDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you to remove the post") == true) {
      deletePost(id);
    } else {
      return;
    }
  }

  return (
    <li className={classes.post}>
      <h3 className='flex justify-between'>
        <Link href={`/posts/${id}`} className='flex'><IoMdCreate />{title}</Link>
        <p className='hover:cursor-pointer' onClick={() => handleDelete(id)}>
          <IoIosCloseCircleOutline />
        </p>
      </h3>
      <small className={classes.date}>
        {formattedDate} • ☕️ {Math.ceil(content.length / 10)} min read
      </small>
      <p>{content}</p>
    </li>
  );
};
export default PostItem;
