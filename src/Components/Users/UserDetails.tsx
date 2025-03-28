import { Avatar, Stack } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { observer } from "mobx-react-lite";
import userStore from "./UserStore";
import { UserType } from "../../Types/UserType";

if(userStore.user==null) {
    console.log(userStore.user);
    console.log(userStore.getUserId());
    
    
    userStore.fetchUser(userStore.getUserId())
}
const UserDetails = observer(() => {
    
    
    const user: UserType =userStore.user
    
    function stringAvatar(name: string) {
        if (name == undefined) {
            name = '';
        }
        return {
            sx: {
                bgcolor: "#FFFFFF",
                color:"rgb(87 159 186);"
            },
            children: `${name.split(' ')[0][0]}`,
        };
    }
    
    return (

        <Stack direction="row" spacing={2}>
            {!user.name || user.name.trim() === ''?(<> <PersonIcon/></>):(<>
            <Avatar {...stringAvatar(user.name)} />
            </>)}
           
        </Stack>
    );
})
export default UserDetails