import React,{useContext} from "react";
import useStyle from "./listStyle";
import {
  List as MUIList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Slide,
} from "@material-ui/core";
import { Delete, MoneyOff } from "@material-ui/icons";
import {ExpenseTrackerContext} from '../../../Context/context'


const List = () => {
  const classes = useStyle();
  const {deleteTransaction,transactions} = useContext(ExpenseTrackerContext);
 
  return (
    <MUIList dense={false} className={classes.list}>
      {transactions.map((tran) => (
        <Slide direction="down" in mountOnEnter unmountOnExit key={tran.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                className={
                  tran.type === "Income"
                    ? classes.avatarIncome
                    : classes.avatarExpense
                }
              >
                <MoneyOff />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={tran.category}
              secondary={`$${tran.amount}-${tran.date}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" arial-label="delete" onClick={()=> deleteTransaction(tran.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
      ))}
    </MUIList>
  );
};

export default List;
