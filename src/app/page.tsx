import { redirect } from 'next/navigation'
import styles from './page.module.scss'

export default function Home() {
  redirect("app/chats")
  return (
    <></>
  )
}
