// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;


 contract BilVote{

    uint counter=0;
    address public admin;
    uint mpcounter=0;

    enum Phase{
        Register,
        Voting,
        Results
    }
    Phase public _phase;
    struct Voter{
        uint id;
        address mp;
        string constituency;

    }

    struct Bill{
        uint id;
        string name;
        string year;
        Phase phase;
        uint yesVotes;
        uint noVotes;
    }
    mapping(uint =>mapping(address=>bool)) public hasVoted;
    mapping(uint =>Bill) public bills;
    mapping(address=>bool) public isVoter;
    mapping(address=>Voter) public mps;
    Voter [] public voters;
    Bill [] allBills;

    constructor(){
        counter ++;
        admin =msg.sender;
    }

    modifier onlyAdmin(){
        require(msg.sender ==admin, "Not and admin");
        _;
    }

    modifier validAddress(address _addr){
        require(msg.sender != address(0), "invalid address");
        _;
    }

    function changeAdmin (address newAdmin) onlyAdmin validAddress(newAdmin) public{
        admin =newAdmin;
    }

    function registerVoter(address _voter, string memory _constituency) onlyAdmin validAddress(_voter) public {
        require(isVoter[_voter] !=true);
        mpcounter++;
        Voter memory voter=Voter({
            mp:_voter,
            constituency:_constituency,
            id:mpcounter
        });
        isVoter[_voter]=true;
        mps[_voter]=voter;
    }

    function registerBill(string memory _name, string memory _year) onlyAdmin public{

        Bill storage newBill= bills[counter];
        newBill.id=counter;
        newBill.name=_name;
        newBill.year=_year;
        newBill.phase=_phase;
        newBill.yesVotes=0;
        newBill.noVotes=0;
        allBills.push(newBill);
        counter++; 
    }

    function changeBillPhase(uint _id) onlyAdmin public{
        require(_id !=0, "invlaid id");
        Bill storage _bill=bills[_id];
        _bill.phase =Phase.Voting;
        
    }

    function closeVoting(uint _id) onlyAdmin public{
        require(_id !=0, "invlaid id");
        Bill storage _bill=bills[_id];
        _bill.phase =Phase.Results;
        
    }

    function voteYesForBill(uint _id) public{
        require(isVoter[msg.sender]);
        Bill storage billToVote=bills[_id];
        require(!hasVoted[_id][msg.sender]);
        require(billToVote.phase ==Phase.Voting);
        billToVote.yesVotes++;
        hasVoted[_id][msg.sender]=true;
    }

    function voteNoForBill(uint _id) public{
        require(isVoter[msg.sender]);
        Bill storage billToVote=bills[_id];
        require(!hasVoted[_id][msg.sender]);
        require(billToVote.phase ==Phase.Voting);
        billToVote.noVotes++;
        hasVoted[_id][msg.sender]=true;
    }

    function results(uint _id) public view returns(uint){
        Bill storage bill =bills[_id];
        return bill.yesVotes;
    }

    function returnBills() public view returns(Bill[] memory){
        return allBills;
    }
 }