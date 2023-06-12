# read the microservices template
TEMPLATE=$(cat .github/template.yml)

# iterate over each microservice directory
for MICROSERVICE in $(ls microservices); do
    echo "generating workflow for microservice/${MICROSERVICE}"

    # replace template route placeholder with route name
    WORKFLOW=$(echo "${TEMPLATE}" | sed "s/{{MICROSERVICE}}/${MICROSERVICE}/g")

    # save workflow to .github/workflows/{MICROSERVICE}
    cd ./.github/workflows/
    echo "${WORKFLOW}" > ${MICROSERVICE}.yml
done
