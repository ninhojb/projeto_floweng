module.exports = {
    categoryWithChildren:
        `WITH RECURSIVE subcategories (id) AS (
            SELECT id FROM categories WHERE id = ?
            UNION ALL
            SELECT c.id FROM subcategories, categories c
                WHERE "parentId" = subcategories.id    
        )
        SELECT id FROM subcategories

    `,
    supportWithDepart:
    `
    SELECT * 
    FROM support S
    INNER JOIN users u
        ON  s.id_user = u.id
    INNER JOIN department d
        ON s.id_depart = d.id  
    
    `

}
