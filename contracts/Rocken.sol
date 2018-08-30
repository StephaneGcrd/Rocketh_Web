pragma solidity ^0.4.20;


contract Rocken{

    string public  name;
    mapping (address => uint) balances;

    struct Item {
          address owner;
          address renter;
          uint price;
          bool validation_owner;
          bool validation_renter;
    }

    struct Event {
        address organizer;
        uint price;
        address[] participants;
        uint nb_max;
    }

    mapping(string=> Item) item_instance;
    mapping(string=> Event) event_instance;

  constructor() public{
    balances[0xf99bc2801C53Be5303e6cdE55D3A5e0d6Ad9926d] = 100000000;
  }

  function AddRockens(uint amt) public{
    balances[msg.sender] += amt;
  }

  function TxToken(uint amt, address receiver) public returns(bool sufficient){

    if (balances[msg.sender] < amt) return false;
		balances[msg.sender] -= amt;
		balances[receiver] += amt;
    return true;
  }

  function getBalance(address addr) public view returns(uint) {
    return balances[addr];
  }

  function setValidation(string _itemid) public returns(bool){
    if ( msg.sender == item_instance[_itemid].owner){
        item_instance[_itemid].validation_owner = true;
        return true;
      }
    else if (msg.sender == item_instance[_itemid].renter){
      item_instance[_itemid].validation_renter = true;
      return true;
    }
    else {
      return false;
    }
  }

  function seeValidation(string _itemid, address _address) public view returns(bool){
    if ( _address == item_instance[_itemid].owner){
        return item_instance[_itemid].validation_owner;
      }
    else if (_address == item_instance[_itemid].renter){
      return item_instance[_itemid].validation_renter;
    }
    else {
      return false;
    }
  }

  function BuyFirst(uint256 price, string _itemid, address _owner) public{
    require(balances[msg.sender] >= price);
    if(item_instance[_itemid].owner == address(0) ){
      //si pas d'adresse définie pour le proprietaire
      item_instance[_itemid] = Item(
        _owner,
        msg.sender,
        price,
        false,
        false
       );
    }
    else{
      item_instance[_itemid].renter = msg.sender;
    }

    balances[msg.sender] -= price;
  }



  function TxSeller(string _itemid) public returns(bool sufficient) {

    bool ValOwner = item_instance[_itemid].validation_owner;
    bool ValRenter = item_instance[_itemid].validation_renter;
    require(ValOwner == true && ValRenter == true);
    balances[item_instance[_itemid].owner] += item_instance[_itemid].price;
    item_instance[_itemid].validation_owner = false;
    item_instance[_itemid].validation_renter = false;

  }

  function CreateEvent(string _itemid, uint price, uint nb_max) public{
    event_instance[_itemid] = Event(
      msg.sender,
      price,
      new address[](0),
      nb_max
      );
  }

  function ParticipateEvent(string _itemid) public{
    require(balances[msg.sender] >= event_instance[_itemid].price);
    require(event_instance[_itemid].participants.length < event_instance[_itemid].nb_max);
    balances[msg.sender] -= event_instance[_itemid].price;
    event_instance[_itemid].participants.push(msg.sender);
  }

  function seeParticipants(string _itemid) public view returns(address[]){
    return event_instance[_itemid].participants;
  }


  function Pay(string _itemid) public{
    uint nb_participants = event_instance[_itemid].participants.length;
    uint prix = event_instance[_itemid].price;
    balances[event_instance[_itemid].organizer] += prix * nb_participants;
    delete event_instance[_itemid];
  }

}
