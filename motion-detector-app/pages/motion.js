import styles from '../styles/Home.module.css'

export const getStaticProps = async () => {

    const res = await fetch('http://localhost:4000/motion-list');
    const data = await res.json();

    return {
        props : { users : data }
    }
}

const Motions = ({users}) => {
    const image_head = 'data:image/jpeg;base64,';
    return (
        <main className={styles.main}>
            <div>
            <h1 className={styles.title}>Motion Detected Data</h1>
            {users.map(user => (
                <div key={user.id}>
                    <p>{ user.date_time }</p>
                    <img className={styles.grid} src={image_head + Buffer.from(user.captured_image).toString('utf-8')}></img>
                </div>
            ))}
        </div>
        </main>
        
    )
}

export default Motions;