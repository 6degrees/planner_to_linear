// This is a custom function to return only one assignee
export const onlyOneAssignee = (input: any[]): string => {
    // if input is only one item and it is an empty string after trimming, return empty string
    if (input.length === 1 && input[0].trim() === "") return "";

    if (input.length == 0) return "";
    
    // if a member is called "Member" or "Fahad Alaqidi" remove from array
    input = input.filter(member => !["Member", "Fahad Alaqidi"].includes(member));

    // if more than 1 member, check if they contain "Atheer Alotaibi" or "Mohannad Otaibi" and remove them
    if (input.length > 1)
    input = input.filter(member => !["Atheer Alotaibi", "Mohannad Otaibi"].includes(member));
    
    // some arrays after this might be blank, if so, return undefined
    if (input.length == 0) return "";

    // if there is only one member, return it
    if (input.length == 1) {
        return input[0]
    }
    else return "";
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
