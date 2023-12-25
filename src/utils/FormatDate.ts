import moment from "moment";

export const formatDate = (dateString: string) => {
    const date = moment(dateString);
    const now = moment();
    const diff = now.diff(date, "minutes");
  
    if (diff < 1) {
      return "just now";
    } else if (diff < 60) {
      return `${diff} minutes ago`;
    } else if (diff < 1440) {
      return `${Math.floor(diff / 60)} hours ago`;
    } else if (diff < 10080) {
      return `${Math.floor(diff / 1440)} days ago`;
    } else {
      return date.format("MMM D, YYYY");
    }
  }

  export const  costumDate = (dateString: string) => {
    const date = moment(dateString);
    const now = moment();
    const diff = now.diff(date, "days");

    if (diff === 0){
        return `Today at ${date.format("h:mm A")}`
    }
    else if (diff === 1){
        return `Yesterday at ${date.format("h:mm A")}`
    }
    else if (diff > 1 && diff < 7){
        return `${date.format("dddd")} at ${date.format("h:mm A")}`
    }
    else{
        return `${date.format("MMM D, YYYY")} at ${date.format("h:mm A")}`
    }
      
  }
  