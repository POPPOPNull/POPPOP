import React, { useEffect, useRef } from 'react'
import { useDrag, useDragLayer, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'



export default function MovableComponent({ id, index, moveComponent, children }) {
  const ref = useRef(null)

  const img = {}
  

  const [, drop] = useDrop({
    accept: 'COMPONENT',
    hover(item,monitor) {
        
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index

    //   console.log(hoverIndex,'호버중')

      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom-hoverBoundingRect.top)/4;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y-hoverBoundingRect.top

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return

      
      moveComponent(dragIndex, hoverIndex)
      item.index = hoverIndex
      
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'COMPONENT',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  useEffect(() => {
    preview(img, { captureDraggingState: true })
  }, [preview])



  return (
    <div
      ref={ref}
      
    >
      {children}
    </div>
  )
}

// 2️⃣ 커스텀 드래그 레이어

