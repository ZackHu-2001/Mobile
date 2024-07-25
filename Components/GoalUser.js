import { useState, useEffect } from "react";
import { getAllDocs, writeToDB } from "../Firebase/firestoreHelper";
import { FlatList, Text } from "react-native";

const GoalUser = ({ id }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = getAllDocs(`goals/${id}/users`);
                console.log(data)
                if (data.length > 0) {
                    setUsers(data);
                    return;
                }

                const reponse = await fetch('https://jsonplaceholder.typicode.com/users');
                const res = await reponse.json();
                setUsers(res);
                res.forEach(element => {
                    writeToDB(element, `goals/${id}/users`);
                });
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    return (
        <FlatList data={users}
            renderItem={({ item }) => <Text>{item.name}</Text>}
            keyExtractor={item => item.id} />
    );
}

export default GoalUser;