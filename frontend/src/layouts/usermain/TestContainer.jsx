import React, { useState, useCallback } from 'react'
import MovableComponent from './MovableComponent'
import { MidComp1, MidComp2 } from '../../components/user/usermain/MidComp'
import CategoryComp from '../../components/user/usermain/CategoryComp'
CategoryComp

// function WidgetA() {
//   return <div style={{ background: '#ffd6d6', padding: 10 }}>📊 Chart Widget</div>
// }

// function WidgetB() {
//   return <div style={{ background: '#d6f5ff', padding: 10 }}>🗂 Table Widget</div>
// }

// function WidgetC() {
//   return <div style={{ background: '#d6ffd6', padding: 10 }}>📝 Note Widget</div>
// }

export default function ComponentContainer() {
  const [components, setComponents] = useState([
    { id: 1, component: <CategoryComp /> },
    { id: 2, component: <MidComp1 /> },
    { id: 3, component: <MidComp2 /> },
  ])

  const moveComponent = useCallback((from, to) => {
    setComponents((prev) => {
      const updated = [...prev] // 기존 배열
      const [moved] = updated.splice(from, 1)
      updated.splice(to, 0, moved)
      return updated
    })
  }, [])

  return (
    <div >
      {components.map((item, index) => (
        <MovableComponent
          key={item.id}
          id={item.id}
          index={index}
          moveComponent={moveComponent}
        >
          {item.component}
        </MovableComponent>
      ))}
    </div>
  )
}
