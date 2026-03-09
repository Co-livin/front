export function Navbar(){

    return`

    <div class="navbar">
    
        <div class="logo" onclick="location.hash='dashboard'">
            COLI
        </div>
        
        <div class="nav-links">
        
            <button onclick="location.hash='dashboard'">
                Spaces
            </button>
            
            <button onclick="location.hash='profile'">
                Profile
            </button>
        
        </div>
    
    </div>
    
    `;

}