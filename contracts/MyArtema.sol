pragma solidity ^0.5.0;

contract MyArtema{
    
    struct Art{
        uint id;
        string name;
        string image;
        uint price;
        string description;
    }
    
    Art[] public arts;
    mapping(uint => address payable) public artToPublisher;
    mapping(address => uint) public publishCount;
    mapping(uint => address) public artToBuyer;
    mapping(address => uint) public buyCount;
    mapping(address => string) public artistName;
    //mapping(string => address) public nameToAddress;
    
    mapping(address => mapping(uint => bool)) public reposts;
    mapping(address => mapping(uint => bool)) public likes;
    
    function addArt(string memory _name,string memory _image,uint _price,string memory _description) public {
        require(_price >= 0,"Price must be >= 0");
        uint id = arts.push(Art(0,_name,_image,_price,_description)) - 1;
        arts[id].id = id;
        artToPublisher[id] = msg.sender;
        if(_price == 0)
            artToPublisher[id] = msg.sender;
        publishCount[msg.sender]++;
    }
    
    function buyArt(uint _id) public payable{
        require(artToBuyer[_id] == address(0),"This product has already been bought");
        require(msg.value == arts[_id].price,"Value sent must be equal to the price");
        
        address payable owner = artToPublisher[_id];
        buyCount[msg.sender]++;
        owner.transfer(msg.value);
        artToBuyer[_id] = msg.sender;
    }
    
    function getArts(address _publisher) public view returns(uint[] memory){
        uint[] memory artsTab = new uint[](publishCount[_publisher]);
        uint counter;
        for(uint i = 0 ; i < arts.length ; i++){
            if(artToPublisher[i] == _publisher){
                artsTab[counter++] = i;
            }
        }
        
        return artsTab;
    }

    function getBoughtArts(address _buyer) public view returns(uint[] memory){
        uint[] memory artsTab = new uint[](buyCount[_buyer]);
        uint counter;
        for(uint i = 0 ; i < arts.length ; i++){
            if(artToBuyer[i] == _buyer){
                artsTab[counter++] = i;
            }
        }
        
        return artsTab;
    }

    // might be subject to reentrancy ?
    function changeArtistName(string memory _name) public{
        //require(nameToAddress[_name] == address(0),"Name already exists");
        //nameToAddress[artistName[msg.sender]] = address(0);
        artistName[msg.sender] = _name;
        //nameToAddress[_name] = msg.sender;
    }

    // function checkname(string _name) public view

    function getArt(uint _id) public view returns(uint, string memory , string memory , uint , string memory , address , address ){
        Art memory a = arts[_id];
        address buyer = artToBuyer[_id];
        address publisher = artToPublisher[_id];
        return(a.id,a.name,a.image,a.price,a.description,publisher,buyer);
    }

    function getArtistInfo(address _artist) public view returns(string memory,uint,uint){
        string storage name = artistName[_artist];
        uint numberOfArt = getArts(_artist).length;
        uint numberOfArtBought = getBoughtArts(_artist).length;
        return(name,numberOfArt,numberOfArtBought);
    }

    function getArtsLength() public view returns(uint){
        return arts.length;
    }
    
    function likeArt(uint _id) public{
        require(_id < arts.length,"The art has to exist to like it");
        likes[msg.sender][_id] = true;
    }
    
    function isLiked( uint _id) public view returns(bool){
        return likes[msg.sender][_id];
    }
    
    function repostArt(uint _id) public{
        require(_id < arts.length,"The art has to exist to repost it");
        reposts[msg.sender][_id] = true;
    }
    
    function isReposted( uint _id) public view returns(bool){
        return reposts[msg.sender][_id];
    }

    function getArtistName(address _address) public view returns(string memory){
        return artistName[_address];
    }
}