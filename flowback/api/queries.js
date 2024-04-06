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
    `SELECT s.id
        , s.service
        , s.description
        , s.priority
        , s.action
        , s.status
        , s.expected_date
        , s.created_at
        , s.update_at
        , s.completion_date
        , u.name as user_name
        , d.name as depart_name 
    FROM support s
    INNER JOIN users u
        ON  s.id_user = u.id
    INNER JOIN department d
        ON s.id_depart = d.id  
    
    `
,
supportWithDepartPendent:
`SELECT s.id
    , s.service
    , s.description
    , s.priority
    , s.action
    , s.status
    , s.expected_date
    , s.created_at
    , s.update_at
    , s.completion_date
    , u.name as user_name
    , d.name as depart_name 
FROM support s
INNER JOIN users u
    ON  s.id_user = u.id
INNER JOIN department d
    ON s.id_depart = d.id 
WHERE s.status = 'pendente'

`
}
