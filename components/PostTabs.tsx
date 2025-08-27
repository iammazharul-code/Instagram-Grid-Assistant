import React from 'react';
import { GridIcon, ReelsIcon, TaggedIcon } from './Icons';

const PostTabs: React.FC = () => {
  return (
    <div className="border-t border-gray-300 dark:border-zinc-700">
      <div className="flex justify-around">
        <button className="flex-1 py-3 flex justify-center border-t-2 border-black dark:border-white">
          <GridIcon className="w-6 h-6 text-black dark:text-white" />
        </button>
        <button className="flex-1 py-3 flex justify-center">
          <ReelsIcon className="w-6 h-6 text-gray-400 dark:text-zinc-500" />
        </button>
        <button className="flex-1 py-3 flex justify-center">
          <TaggedIcon className="w-6 h-6 text-gray-400 dark:text-zinc-500" />
        </button>
      </div>
    </div>
  );
};

export default PostTabs;