import type { Node, NodeProps } from '@xyflow/react';
 
type StickerNodeProps = Node<{ type: StickerCategories }>;
export enum StickerCategories {
  Dog = "dog",
  Cat = "cat",
  Duck = "duck"
}

export default function StickerNode({ data }: NodeProps<StickerNodeProps>) {
  switch(data.type) {
   case StickerCategories.Dog:
    return <img src="/stickers/dog.png" className="drop-shadow-md" width={80}/>
   case StickerCategories.Cat:
    return <img src="/stickers/dog.png" width={80}/>
  case StickerCategories.Duck:
    return <img src="/stickers/dog.png" width={80}/>
  }
}