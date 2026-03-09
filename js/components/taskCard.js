export function taskCard(task){

    return`

    <div class="card">
    
        <h3>${task.title}</h3>
        
        <p>Responsible: ${task.user}</p>
        
        <p>Due: ${task.due}</p>
        
        <br>
        
        <button class="button success">
            Mark Done
        </button>
    
    </div>
    
    `;

}