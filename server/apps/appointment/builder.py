from django.db.models import Q


class DoctorQueryFilterBuilder:
    def __init__(self):
        self.or_conditions = []

    def by_first_name(self, first_name):
        if first_name:
            self.or_conditions.append(Q(first_name__startswith=first_name))
        return self

    def by_last_name(self, last_name):
        if last_name:
            self.or_conditions.append(Q(last_name__startswith=last_name))
        return self

    def by_speciality_name(self, speciality_name):
        if speciality_name:
            self.or_conditions.append(Q(speciality__name__startswith=speciality_name))
        return self

    def build(self):
        return Q(*self.or_conditions, _connector=Q.OR)
