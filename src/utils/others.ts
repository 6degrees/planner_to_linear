// This is a custom function to return only one assignee

export const onlyOneAssignee = (input: any[]): string => {
    // print input in one line as a string

    // if input is only one item and it is an empty string after trimming, return empty string
    if (input.length == 1 && input[0].trim() == "") return "";

    
    if (input.length == 0) return "";
    // if a member is called "Member" or "Fahad Alaqidi" remove from array
    input = input.filter(member => member != "Member" && member != "Fahad Alaqidi");

    // if more than 1 member, check if they contain "Atheer Alotaibi" or "Mohannad Otaibi" and remove them
    if (input.length > 1)
    input = input.filter(member => member != "Atheer Alotaibi" && member != "Mohannad Otaibi");
    
    // some arrays after this might be blank, if so, return undefined
    if (input.length == 0) return "";

    // if there is only one member, return it
    if (input.length == 1) {
        return input[0]
    }
    else return "";
}

export const mapMembers = (input: []): string => {
    const onlyOne = onlyOneAssignee(input);
    const membersMap: any = {
        "": undefined,
        "Atheer Alotaibi": "aa28a6a1-acba-4fab-9bb5-ff618e2316fb",
        "Hussain Alsaffar": "50d5fcf0-44b9-40a0-aead-d2b75841d10d",
        "Reem Abahussian": "48db9f27-616d-4070-adbf-4cb0ee2b5850",
        "Mutlaq Aldhubaib": "5f0a2780-4f87-4c12-b12e-52c502a429c4",
        "Mohannad Otaibi": "5bf18e83-c541-447c-9bc8-43f20a79f14a",
    }

    return membersMap[onlyOne] || undefined;
}